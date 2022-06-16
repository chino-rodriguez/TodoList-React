import React, { useState } from 'react';
import NewTaskForm from './NewTaskForm';
import PendingTasks from './PendingTasks'
import { Link } from 'react-router-dom';
import CompletedTasks from './CompletedTasks';

function HomePage(props) {
    console.log('home page render');

    const [showCompleted, setShowCompleted] = useState(false);
    const [dummy, setDummy] = useState(true);
    console.log(`Dummy: ${dummy}`);
    // const [user, setUser] = useState(props.user);

    let message = null;
    let newTaskForm = null;
    let pendingTasks = null;
    let completedTasks = null;
    let toggleTasksButton = null;

    if (props.user) {
        message = <p className='display-5 fw-bold text-light'>Tasks</p>;
        newTaskForm = <NewTaskForm setValue={setDummy} value={dummy} />;
        pendingTasks = <PendingTasks />; // I want this to re-render every time a new task is added
        completedTasks = <CompletedTasks />;

        toggleTasksButton =
            <div className="btn-group mb-3" role="group" aria-label="Toggle tasks button group">
                <input type="radio" className="btn-check" name="btnradio" id="pending" checked={!showCompleted} onChange={() => setShowCompleted(false)}></input>
                <label className="btn btn-outline-light" htmlFor="pending">Pending</label>

                <input type="radio" className="btn-check" name="btnradio" id="completed" checked={showCompleted} onChange={() => setShowCompleted(true)}></input>
                <label className="btn btn-outline-light" htmlFor="completed">Completed</label>
            </div>;
    } else {
        message = <p className="pt-4"><Link to='/register' className='text-decoration-none d-inline'>Register</Link> or <Link to='/login' className='text-decoration-none d-inline'>Login</Link> first</p>;
    }

    return (
        <div className="row pt-3">
            {newTaskForm}
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                {message}
                {toggleTasksButton}
                {!showCompleted ? pendingTasks : completedTasks}
            </div>
        </div>
    )
}

export default HomePage;