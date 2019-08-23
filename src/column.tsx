import * as React from 'react'
import { IColumn, ITask } from './models';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';


export interface IColumnParentProps {
    column: IColumn;
    tasks: ITask[];
}

type IColumnProps = IColumnParentProps;

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.h3`
    margin: 0px;
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

export default class Column extends React.Component<IColumnProps> {
    public render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => {
                                return <Task key={task.id} task={task} index={index}/>
                            })}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}