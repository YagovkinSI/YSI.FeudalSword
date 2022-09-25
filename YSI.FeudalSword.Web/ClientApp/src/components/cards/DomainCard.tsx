import * as React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enTitleRank } from '../../models/IPublicDataApiModel';
import { ApplicationState } from '../../store';
import { domainCardHelper } from '../../store/UI/MapPage/LeftCanvas/Helpers/DomainCardHelper';
import { leftCanvasActionCreators } from '../../store/UI/MapPage/LeftCanvas/LeftCanvasActionCreators';
import { enContentType } from '../../store/UI/MapPage/LeftCanvas/LeftCanvasState';
import CardLinkLine, { enCardLinkLineType } from '../elements/CardLinkLine';

const DomainCard: React.FC = () => { 
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    const domainId = appState.root.ui.mapPage.leftCanvas.contentId;
    if (domainId == undefined)
        return ( <>ОШИБКА: Не определен идентификатор владения.</> )

    const state = domainCardHelper.checkDataForDomain(appState.root, domainId);
    React.useEffect(() => {
        if (!state)
            dispatch(leftCanvasActionCreators.setContentForLeftCanvas(enContentType.Domain, domainId))
    });

    if (!state)
        return (
            <>
                <Spinner animation="border" role="status" size="sm"/>
                Загрузка...
            </>
        )    
    
    const title = state.titles.find(t => t.rank == enTitleRank.Earl);
    if (title == undefined)
        return ( <>ОШИБКА: Не удеаётся загрузить данные владения</> )

    const ownerId = title.ownerId;
    if (ownerId == undefined)
        return ( <>ОШИБКА: Не удеаётся загрузить данные владельца</> )
    
    return (
        <Card style={{ margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{title.name}</Card.Title>
                <h6>Владелец:</h6>
                <CardLinkLine 
                    lineType={enCardLinkLineType.Character} 
                    contentId = {ownerId}
                />                    
                <h6>Армии во владении:</h6>
                {state.armiesHere.map(army => {
                    return (<CardLinkLine 
                        key={army.id}
                        lineType={enCardLinkLineType.Army} 
                        contentId = {army.id}
                    />)  
                })}
            </Card.Body>
        </Card>
    )
}

export default DomainCard