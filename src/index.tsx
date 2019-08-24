import * as React from 'react';
import * as ReactDOM from 'react-dom';
import initialData from './initialData';
import Column from './column';
import { ITask, IColumn, IInitialData } from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  public state = initialData;

  public onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let startColumn: IColumn = this.state.columns[0];
    let finishColumn: IColumn = this.state.columns[0];

    // ドラッグ及びドロップされたカラムオブジェクトを取得
    this.state.columns.forEach((column, index) => {
      if(column.id === source.droppableId) {
        startColumn = column;
      } else if(column.id === destination.droppableId) {
        finishColumn = column
      }
    })

    // ドラッグとドロップのエリアが同じだった場合の処理
    if (startColumn === finishColumn) {
      // dnd後のtaskIdsを作成
      const newTasksIds = startColumn.taskIds;
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumns = this.state.columns.map(column => {
        if(column.id === startColumn.id) {
          column.taskIds = newTasksIds
        }
        return column;
      })

      const newState: IInitialData = {
        ...this.state,
        columns: newColumns
      }
      this.setState(newState);
      return;
    }

    // 以下、ドラッグとドロップのエリアが異なる場合の処理

    // ドラッグ後のtaskIds作成
    const startTaskIds = startColumn.taskIds;
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    }

    // ドロップ後のtaskIds作成
    const finishTaskIds = finishColumn.taskIds;
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    }

    // dnd後のcolumns作成
    const newColumns = this.state.columns.map(column => {
      if(column.id === newStartColumn.id) {
        column.taskIds = newStartColumn.taskIds
      } else if(column.id === newFinishColumn.id) {
        column.taskIds = newFinishColumn.taskIds
      }
      return column
    })

    const newState = {
      ...this.state,
      columns: newColumns
    }

    this.setState(newState);
    return;
  }

  public render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columns.map((column) => {
            const tasks: ITask[] = []
            column.taskIds.forEach((taskId) => {
              this.state.tasks.forEach(task => {
                if (taskId === task.id) {
                  tasks.push(task);
                }
              })
            })
            return (
              <Column key={column.id} column={column} tasks={tasks} />
            );
          })
          }
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
