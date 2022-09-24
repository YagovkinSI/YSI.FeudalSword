import * as React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { enTitleRank } from '../../models/IPublicDataApiModel';
import { ApplicationState } from '../../store';

const DomainCard: React.FC = () => { 
    const dispatch = useDispatch(); 
    const appState = useSelector(state => state as ApplicationState);
    const domainId = appState.root.ui.mapPage.leftCanvas.contentId;
    const domain = appState.root.publicData.domains
        .find(d => d.id == domainId);
    const titlesIds = domain == undefined
        ? undefined
        : domain.titlesIds;
    const title = titlesIds == undefined
        ? undefined
        : appState.root.publicData.titles
            .find(t => titlesIds.includes(t.id) && t.rank == enTitleRank.Earl);
    
    console.log(appState.root.publicData);

    return (
        <Card style={{ margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{title?.name} //TODO</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    //TODO Владелец {title?.ownerId}
                </Card.Subtitle>
                <Card.Text>
                    //TODO О Владении {domain?.id}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DomainCard