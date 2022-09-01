import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Authorization from '../../store/Authorization';
import { Card } from 'react-bootstrap';
import { ICharacter } from '../../models/ICharacter';

const CharacterCard :  React.FC<ICharacter> = (character) => { 
    return (
        <Card style={{ margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{character.name} {character.dynastyName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Игрок - {character.userName == '' ? 'ОТСУТСТВУЕТ' : character.userName}
                </Card.Subtitle>
                <Card.Text>
                    Во владении персонажа:
                </Card.Text>
                <ul>
                { character.titles.map(t => 
                    <li key={t.id}>{t.name}</li>
                )}
                </ul>
            </Card.Body>
        </Card>
    )
};

export default connect(
    (state: ApplicationState) => state.authorization,
    Authorization.actionCreators
)(CharacterCard);
