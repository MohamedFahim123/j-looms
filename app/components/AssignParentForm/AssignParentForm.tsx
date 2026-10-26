"use client";

import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { submitApplicationJson } from "@/app/utils/submitApplicationJson";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
<<<<<<< HEAD
import ParentCard from "../ParentCard/ParentCard";
=======
import axios from "axios";
import SelectMenu from "../SelectMenu/SelectMenu";
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

export interface ParentInterface {
  id?: number;
  name?: string;
  code?: string;
  email?: string;
  phone?: string;
  image?: string;
  relation?: string;
}

export default function AssignParentForm({
  studentId,
}: {
  studentId?: number | string;
}) {
  const {
    register,
    setError,
    reset,
    watch,
<<<<<<< HEAD
=======
    setValue,
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormAuthInputs>();
<<<<<<< HEAD
=======
  const token = Cookies.get("SERVER_JLOOMS_TOKEN");
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
  const [currParent, setCurrParent] = useState<ParentInterface>();

  const handleGetParentByCode = async () => {
    const parentId = watch("parent_id");
<<<<<<< HEAD
    const token = await getTokenFromServerCookies();
=======
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    const loadingToastId = toast.loading("Loading...");
    try {
      if (parentId) {
        const response = await axios.get(
<<<<<<< HEAD
          `${
            dataURLS.filterParentsByCode
          }?code=${parentId}&t=${new Date().getTime()}`,
=======
          `${dataURLS.filterParentsByCode}?code=${parentId}&t=${new Date().getTime()}`,
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
<<<<<<< HEAD
          }
=======
          },
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        );
        toast.update(loadingToastId, {
          render:
            response?.data?.data?.message || "Parent Loaded Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        setCurrParent(response?.data?.data?.parent);
      } else {
        toast.update(loadingToastId, {
          render: "Parent Code is required!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setError("parent_id", { message: "Parent Code is required" });
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : "An unexpected error occurred.";
      setCurrParent({});
      toast.update(loadingToastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    clearErrors("parent_id");
  }, [watch("parent_id")]);

  const onSubmit: SubmitHandler<FormAuthInputs> = async (data) => {
    await submitApplicationJson(
      { ...data, student_id: `${studentId}`, parent_id: `${currParent?.id}` },
      dataURLS.assignParentToStudent,
      setError,
<<<<<<< HEAD
      reset
=======
      reset,
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
    );
    setCurrParent({});
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 mt-5">
      <div className="mb-6 relative">
        <label
          htmlFor="parentId"
          className="block text-gray-700 font-medium mb-1"
        >
          Enter Parent Code
        </label>
        <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
          <input
            id="parentId"
            type="text"
            placeholder="Parent Code"
            className={`flex-1 px-4 py-2 focus:outline-none`}
            {...register("parent_id", { required: "Parent ID is required" })}
          />
          <button
            type="button"
            onClick={handleGetParentByCode}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-medium py-2 px-4"
          >
            <CiSearch size={24} />
          </button>
        </div>
        {errors.parent_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.parent_id.message}
          </p>
        )}
      </div>
      {currParent?.name && currParent?.code && currParent?.image ? (
        <>
          <ParentCard
            name={currParent?.name}
            code={currParent?.code}
            imageUrl={currParent?.image}
          />
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-1"
            >
              Relation
            </label>
<<<<<<< HEAD
            <select
              id="type"
              defaultValue={""}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("type", { required: "Relation is required" })}
            >
              <option value="" disabled>
                Select Relation
              </option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="guardian">Guardian</option>
            </select>
=======
            <input
              type="hidden"
              {...register("type", { required: "Relation is required" })}
            />
            <SelectMenu
              id="type"
              value={watch("type") || ""}
              onChange={(value) =>
                setValue("type", value, { shouldValidate: true })
              }
              placeholder="Select Relation"
              invalid={Boolean(errors.type)}
              options={[
                { value: "father", label: "Father" },
                { value: "mother", label: "Mother" },
                { value: "guardian", label: "Guardian" },
              ]}
            />
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
        </>
      ) : (
        ""
      )}

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={!watch("parent_id") || !watch("type") || isSubmitting}
<<<<<<< HEAD
          className={`${
            !watch("parent_id") || !watch("type") || isSubmitting
              ? "bg-indigo-400"
              : "bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
          } text-white font-medium py-2 px-4 rounded`}
=======
          className={`${!watch("parent_id") || !watch("type") || isSubmitting ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"} text-white font-medium py-2 px-4 rounded`}
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)
        >
          Assign Parent
        </button>
      </div>
    </form>
  );
}
