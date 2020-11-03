import React from 'react';
import { eventData, crisisData } from './data/eventData';

class EventViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDescriptions: false,
      showAll: true,
    }
  }

  onShowDescriptionsChange() {
    this.setState({ showDescriptions: !this.state.showDescriptions });
  }

  onShowAllChange() {
    this.setState({ showAll: !this.state.showAll });
  }

  eventsFromStr() {
    const eventItems = this.props.eventStr.split(',') // 1,2-3
    let events = []

    for (const eItem of eventItems) {
      console.log(eItem)
      let data = eItem.startsWith('C') ? crisisData : eventData
      if (eItem.includes('-')) {
        let eRange = eItem.split('-')
        let start = parseInt(eRange[0])
        let end = parseInt(eRange[1])
        for (let i = start; i <= end; i++) {
          let e = eventData[i]
          events.push({
            id: e.id,
            name: e.name,
            description: e.description,
          })
        }

      } else {
        const e = data[eItem]
        if (e) {
          events.push({
            id: e.id,
            name: e.name,
            description: e.description,
          })
        }
      }
    }
    return events
  }

  renderDeckList() {
    let events = this.eventsFromStr()
    return (
      <ul>
        {events.map((e, index) =>
          <li key={index} >
            <span className="eventID"> {e.id} </span>
            <span className="eventName"> {e.name} </span>
            <span className="eventDesc">
              {this.state.showDescriptions ? e.description : ''}
            </span>
          </li>
        )}
      </ul>
    )
  }

  render() {
    return (
      <div class="eventViewer">
        <label title='Descriptions'>
          <input type="checkbox"
            checked={this.state.showDescriptions}
            onChange={() => this.onShowDescriptionsChange()} />
          Descriptions
        </label>
        <label title='Show Deck'>
          <input type="checkbox"
            checked={this.state.showAll}
            onChange={() => this.onShowAllChange()} />
          Deck
        </label>
        {this.state.showAll ? this.renderDeckList() : ''}
      </div>
    )
  }

}

export default EventViewer;
