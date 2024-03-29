import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug }) {
    const [undoCompleteValues, setUndoCompleteValues] = useState(initialValues || {});
    const [undoCompleteError, setUndoCompleteError] = useState(null);
    const [tasksPostUndoComplete, setTasksPostUndoComplete] = useState(null);
    const [completedTasksPostUndoComplete, setCompletedTasksPostUndoComplete] = useState(null);

    //submit form when submit button is clicked
    const handleUndoComplete = event => {
        event.preventDefault();
        submitData({ undoCompleteValues });
    };

    //send data to database
    const submitData = async (formValues) => {
        const dataObject = formValues.undoCompleteValues;
        const { id } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `/${slug}/${id}`,
                headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                withCredentials: true

            }).then(res => {
                setTasksPostUndoComplete(res.data.pendingTasks);
                setCompletedTasksPostUndoComplete(res.data.completedTasks);
                setUndoCompleteError(null);
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
            setUndoCompleteError(err.response.data);
        }
    };
    return {
        undoCompleteValues,
        handleUndoComplete,
        undoCompleteError,
        tasksPostUndoComplete,
        completedTasksPostUndoComplete
    }
}