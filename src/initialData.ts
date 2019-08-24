import { IInitialData } from './models';

const initialData: IInitialData = {
    tasks: [
        { id: 'task-1', content: 'Take out the garbage' },
        { id: 'task-2', content: 'Watch my favorite show' },
        { id: 'task-3', content: 'Change my phone' },
        { id: 'task-4', content: 'Cook dinner' }
    ],
    columns: [
        {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        {
            id: 'column-2',
            title: 'In progress',
            taskIds: [],
        },
        {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    ],
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;