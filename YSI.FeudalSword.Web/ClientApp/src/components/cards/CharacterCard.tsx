import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Characters from '../../store/Characters';
import { Button, Card, Spinner } from 'react-bootstrap';

interface ICharacterCardProps {
    characterId: number
}

const CharacterCard :  React.FC<ICharacterCardProps> = ({characterId}) => { 
    const dispatch = useDispatch(); 

    React.useEffect(() => {
        dispatch(Characters.actionCreators.getMyCharacter())
    });   
    
    React.useEffect(() => {
        dispatch(Characters.actionCreators.loadCharacter(characterId))
    }); 
    
    const appState = useSelector(state => state as ApplicationState);
    const userId = appState.privateData.user.currentUser == undefined 
        ? undefined
        : appState.privateData.user.currentUser.id;
    const characters = appState.characters == undefined 
        ? undefined
        : appState.characters.characters;  
    const canTakeCharacter = characters == undefined || userId == undefined  
        ? false
        : appState.characters == undefined    
            ? false
            : !characters.some(c => c.userId == userId) 
    const character = appState.characters == undefined
        ? undefined
        : appState.characters.characters.find(c => c.id == characterId)

    const takeCharacter = () => {
        dispatch(Characters.actionCreators.takeContol(characterId))
    }

    if (character == undefined)
        return (
            <>
                <Spinner animation="border" role="status" size="sm"/>   
                Загрузка... 
            </>
        )
    else
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
