import * as React from 'react';
import { ITask } from './models';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

export interface ITaskParentProps {
    task: ITask,
    index: number
}

type ITaskProps = ITaskParentProps;

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

export default class Task extends React.Component<ITaskProps> {
    public render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}