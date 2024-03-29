import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug, method }) {
    const [completeValues, setCompleteValues] = useState(initialValues || {});
    const [completeError, setCompleteError] = useState(null);
    const [tasksPostComplete, setTasksPostComplete] = useState(null);
    const [completedTasksPostComplete, setCompletedTasksPostComplete] = useState(null);

    //submit form when submit button is clicked
    const handleComplete = event => {
        event.preventDefault();
        submitData({ completeValues });
    };

    //send data to database
    const submitData = async (formValues) => {
        const dataObject = formValues.completeValues;
        const { id } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `/${slug}/${id}`,
                headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                withCredentials: true

            }).then(res => {
                setTasksPostComplete(res.data.pendingTasks);
                setCompletedTasksPostComplete(res.data.completedTasks);
                setCompleteError(null);
                if (res.data.redirect === '/') {
                    window.location = "/"; // redirects to home
                }
                else if (res.data.redirect === '/login') {
                    window.location = "/login";
                }
            })
        } catch (err) {
            if (err.response.data.redirect === '/') {
                window.location = "/"; // redirects to home
            }
            else if (err.response.data.redirect === '/login') {
                window.location = "/login";
            }
            setCompleteError(err.response.data);
        }
    };
    return {
        completeValues,
        handleComplete,
        completeError,
        tasksPostComplete,
        completedTasksPostComplete
    }
}