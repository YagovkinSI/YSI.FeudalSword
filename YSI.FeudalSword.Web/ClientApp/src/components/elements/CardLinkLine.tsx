import React from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { enTitleRank, enUnitType, IPublicCharacter, IPublicTitle } from "../../models/IPublicDataApiModel";
import { ApplicationState } from "../../store";
import { publicDataActionCreators } from "../../store/Root/PublicData/Base/PublicDataActionCreators";
import { userCommandsActionCreators } from "../../store/Root/UserData/Commads/UserCommandsActionCreators";

export enum enCardLinkLineType {
    Character = 1,
    Army = 2,
    Domain = 3
}

interface CardLinkLineProp {
    lineType: enCardLinkLineType,
    contentId: number
}

const CardLinkLine : React.FC<CardLinkLineProp> = (props) => {
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);   

    const getCharacterInfo = (
        appState : ApplicationState, 
        dispatch: Dispatch<any>, 
        characterId : number
    ) => {
        const character = appState.root.publicData.characters
            .find(c => c.id == characterId);
        const dynasty = character == undefined
            ? undefined
            : appState.root.publicData.dynasties
                .find(c => c.id == character.dynastyId);
        if (character == undefined || dynasty == undefined)  
        {
            dispatch(publicDataActionCreators.loadCharacter(characterId))
            return (<>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>)
        }  
        else {
            const title = character.suzerainId == undefined
                ? 'Король'
                : 'Лорд';
            return `${title} ${character.name} ${dynasty.name}`;
        }   
    }

    const getArmyInfo = (
        appState : ApplicationState, 
        dispatch: Dispatch<any>, 
        armyId : number
    ) => {
        const army = appState.root.publicData.armies
            .find(c => c.id == armyId);
        const commander = army == undefined
            ? undefined
            : appState.root.publicData.characters
                .find(c => c.id == army.commanderId);
        const location = army == undefined
            ? undefined
            : appState.root.publicData.domains
                .find(c => c.id == army.locationId);
        const unitIds = army == undefined
            ? undefined
            : army.unitIds;
        const units = unitIds == undefined 
            ? undefined
            : appState.root.publicData.units
                .filter(c => unitIds.includes(c.id));
        if (army == undefined || commander == undefined || location == undefined || units == undefined )  
        {
            dispatch(publicDataActionCreators.loadArmy(armyId))
            return (<>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>)
        }
        else {
            const dynasty = commander == undefined
            ? undefined
            : appState.root.publicData.dynasties
                .find(c => c.id == commander.dynastyId);
            if (dynasty == undefined)  
            {
                dispatch(publicDataActionCreators.loadCharacter(commander.id))
                return (<>
                    <Spinner animation="border" role="status" size="sm"/>
                    Загрузка...
                </>)
            }  
            else {
                const count = units.reduce((sum, unit) => sum + unit.countAbout, 0);
                const armyType = !units.some(u => u.type != enUnitType.Commoners)
                    ? 'Ополчение'
                    : !units.some(u => u.type != enUnitType.EliteWarrior)
                        ? 'Гвардия'
                        : count > 1000
                            ? 'Армия'
                            : 'Отряд'
                const title = commander.suzerainId == undefined
                    ? 'король'
                    : 'лорд';
                return `${armyType} около ${count} чел. (${title} ${commander.name} ${dynasty.name})`;
            }

    
        }
    }

    const atackDomain = () => {
        dispatch(userCommandsActionCreators.setCommand(props.contentId))
    }

    const canAtack = (appState : ApplicationState, title: IPublicTitle | undefined) => {
        const character = appState.root.publicData.characters
            .find(c => c.id == appState.root.userData.character.characterId);
        return appState.root.userData.authorization.user != undefined &&
            appState.root.userData.character.characterId != undefined &&
            character != undefined &&
            character.titlesIds != undefined &&
            title != undefined &&
            !character.titlesIds.includes(title.id);
    }

    const isActive = () : boolean => {
        const isActive = props.contentId == appState.root.userData.commands.targetDomainId;
        return isActive;
    }

    const buttonAtack = () => {
        return (
            <Button
                variant="outline-primary"
                size="sm"
                onClick = { atackDomain } 
                active = { isActive() }  >
                Атаковать
            </Button>
        )  
    }

    const getDomainInfo = (
        appState : ApplicationState, 
        dispatch: Dispatch<any>, 
        domainId : number
    ) => {
        const domain = appState.root.publicData.domains
            .find(d => d.id == domainId);
        const title = domain == undefined
            ? undefined
            : appState.root.publicData.titles
                .find(t => t.rank == enTitleRank.Earl && t.capitalId == domain.id); 
        if (domain == undefined || title == undefined)  
        {
            dispatch(publicDataActionCreators.loadDomain(domainId))
            return (<>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>)
        }
        else {
            return (
                <Card style={{ margin: 'auto' }}>
                    <Card.Body>   
                        <Card.Title>{title.name}</Card.Title>
                        { canAtack(appState, title) 
                            ? buttonAtack()
                            : <></>
                        }  
                    </Card.Body>
                </Card>
            )
        }
    }

    const getInfo = (
        appState : ApplicationState, 
        dispatch: Dispatch<any>, 
        props : CardLinkLineProp
    ) => {
        switch (props.lineType) {
            case enCardLinkLineType.Character:
                return getCharacterInfo(appState, dispatch, props.contentId);
            case enCardLinkLineType.Army:
                return getArmyInfo(appState, dispatch, props.contentId);
            case enCardLinkLineType.Domain:
                return getDomainInfo(appState, dispatch, props.contentId);
            default:
                return 'ОШИБКА: Неизвестый тип данных'
        }
    }

    const info = getInfo(appState, dispatch, props);

    return (
        <div>
            {info} 
        </div>
    )
}

export default CardLinkLine;