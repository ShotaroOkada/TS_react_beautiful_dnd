import * as React from 'react';
import * as ReactDOM from 'react-dom';
import initialData from './initialData';
import Column from './column';
import { ITask, IColumn, IInitialData } from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

class App extends React.Component {
  public state = initialData;

  public onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId} = result;

    if(!destination) {
      return; 
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // dndされたカラムオブジェクトを取得
    const changedColumn:IColumn[] = this.state.columns.filter(column => {
      return column.id === source.droppableId
    })
    
    // dnd後のtaskIdsを作成
    const newTasksIds = changedColumn[0].taskIds;
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);

    const newState:IInitialData = {
      ...this.state.columns[source.droppableId],
      tasksIds: newTasksIds
    }

    this.setState(newState);
  }

  public render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columns.map((column) => {
          const tasks: ITask[] = []
          column.taskIds.forEach((taskId) => {
            this.state.tasks.forEach(task => {
              if(taskId === task.id) {
                tasks.push(task);
              }
            })
          })
          return (
            <Column key={column.id} column={column} tasks={tasks} />
          );
        })
        }
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
