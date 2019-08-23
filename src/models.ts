export interface IInitialData {
    tasks: ITask[],
    columns: IColumn[],
    columnOrder: string[]
};

export interface ITask {
    id: string,
    content: string
}

export interface IColumn {
    id: string,
    title: string,
    taskIds: string[]
}