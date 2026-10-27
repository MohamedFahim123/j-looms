import fs from "fs";
import os from "os";
import path from "path";
import { createSeed } from "./seed";
import { MOCK_DB_VERSION, type MockDb } from "./types";
import { ensureWorkspace } from "./workspace-data";

const filePaths = [
  path.join(process.cwd(), "data", "mock-db.json"),
  path.join(os.tmpdir(), "join-looms-mock-db.json"),
];

let memory: MockDb | null = null;
let queue: Promise<unknown> = Promise.resolve();

function persist(db: MockDb) {
  memory = db;
  for (const filePath of filePaths) {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(db));
      return;
    } catch {
      // The project directory is read-only on Vercel. Try the next location.
    }
  }
}

function loadFile(filePath: string): MockDb | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as MockDb;
    if (parsed?.version !== MOCK_DB_VERSION || !Array.isArray(parsed.schools)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function read(): MockDb {
  if (!memory) {
    memory = filePaths.map(loadFile).find((db) => db != null) ?? createSeed();
  }
  if (ensureWorkspace(memory)) persist(memory);
  return memory;
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
      persist(db);
      return result;
    } catch (error) {
      memory = JSON.parse(snapshot) as MockDb;
      persist(memory);
      throw error;
    }
  });
}
