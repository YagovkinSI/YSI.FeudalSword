import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Characters from '../../store/Characters';
import { Button, Card } from 'react-bootstrap';
import { ICharacter } from '../../models/ICharacter';

const CharacterCard :  React.FC<ICharacter> = (character) => { 
    const dispatch = useDispatch(); 

    React.useEffect(() => {
        dispatch(Characters.actionCreators.getMyCharacter())
    });    
    
    const appState = useSelector(state => state as ApplicationState);
    const userId = appState.root.authorization.user == undefined
        ? undefined
        : appState.root.authorization.user.id;
    const characters = appState.characters == undefined 
        ? undefined
        : appState.characters.characters;   
    const canTakeCharacter = characters == undefined || userId == undefined  
        ? false
        : appState.characters == undefined    
            ? false
            : !characters.some(c => c.userId == userId) 

    const takeCharacter = () => {
        dispatch(Characters.actionCreators.takeContol(character.id))
    }

    return (
        <Card style={{ margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{character.name} {character.dynastyName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Игрок - {character.userName != '' 
                        ? character.userName
                        : 'ОТСУТСТВУЕТ'}
                </Card.Subtitle>
                { character.userName == '' && canTakeCharacter
                    ? <Button 
                        onClick={takeCharacter}>
                            ВЫБРАТЬ ЭТОГО ПЕРСОНАЖА
                        </Button>
                    : <></>
                }
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
    (state: ApplicationState) => state.characters,
    Characters.actionCreators
)(CharacterCard);
