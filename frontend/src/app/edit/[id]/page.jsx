"use client"
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getJobByID, updateJob} from "@/service/service";


export default function EditPage({params}){
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        salary:''
    });

    useEffect(() => {
         getJobByID(params.id).then((data)=>{
             setFormData({title: data.title,
                 location: data.location,
                 description: data.description,
                 salary:data.salary})
         });
    }, []);

    const router = useRouter();

    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const  handleSubmit  =async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required.';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else{
            await updateJob(params.id,formData);
            await router.push('/');
        }
    };
    return (<>
            <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-4">
                <h1>Update Job</h1>
                <form className="max-w-lg mx-auto ">
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="mb-5">
                            <label htmlFor="title"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                            <input type="text" id="title" name="title" onChange={handleChange} value={formData.title}
                                   className={errors.title ? "border border-red-500 rounded-lg  block w-full p-2.5":"border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"}
                            />
                            { errors.title  &&
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                    className="font-medium">Oops!</span> {errors.title}</p>
                            }
                        </div>
                        <div className="mb-5">
                            <label htmlFor="location"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
                            <input type="text" id="location" name="location" onChange={handleChange} value={formData.location}
                                   className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                        </div>

                    </div>
                    <div className="mb-5">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input type="text" id="description" name="description" onChange={handleChange} value={formData.description}
                               className={errors.description ? "border border-red-500 rounded-lg  block w-full p-2.5":"border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"}/>
                        { errors.description &&
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                className="font-medium">Oops!</span> {errors.description}</p>
                        }
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 place-items-center">
                        <div className="mb-5">
                            <label htmlFor="salary"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Salary</label>
                            <input type="text" id="salary" name="salary" onChange={handleChange} value={formData.salary}
                                   className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                        </div>
                        <Button variant="contained" onClick={handleSubmit} color="success" className="w-[90px] h-[40px]">
                            Save
                        </Button>

                    </div>
                </form>
            </div>
        </>
    );
}

