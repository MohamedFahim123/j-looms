import fs from "fs";
import path from "path";
import { createSeed } from "./seed";
import { MOCK_DB_VERSION, type MockDb } from "./types";
import { ensureWorkspace } from "./workspace-data";

const filePath = path.join(process.cwd(), "data", "mock-db.json");

let queue: Promise<unknown> = Promise.resolve();

function writeSync(db: MockDb) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(db));
}

function read(): MockDb {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as MockDb;
    if (parsed?.version !== MOCK_DB_VERSION || !Array.isArray(parsed.schools)) {
      const seed = createSeed();
      writeSync(seed);
      return seed;
    }
    if (ensureWorkspace(parsed)) writeSync(parsed);
    return parsed;
  } catch {
    const seed = createSeed();
    writeSync(seed);
    return seed;
  }
}

function enqueue<T>(work: () => T): Promise<T> {
  const run = queue.then(work);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function readDb<T>(reader: (db: MockDb) => T): Promise<T> {
  return enqueue(() => reader(read()));
}

export function updateDb<T>(mutator: (db: MockDb) => T): Promise<T> {
  return enqueue(() => {
    const db = read();
    const snapshot = JSON.stringify(db);
    try {
      const result = mutator(db);
      writeSync(db);
      return result;
    } catch (error) {
      writeSync(JSON.parse(snapshot) as MockDb);
      throw error;
    }
  });
}
