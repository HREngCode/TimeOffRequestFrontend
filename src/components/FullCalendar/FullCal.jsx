//General Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//Component Imports
// import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

//Utility Imports
import { createEventId } from './event-utils'

const FullCal = (props)=> {

  const navigate = useNavigate();
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  // const [numberEvents, setNumberEvents] = useState(0)

  useEffect(() => {
    console.log("I Only run once (When the component gets mounted)") 
    handleEvents()
  },[props.ptoRequests]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
    console.log(weekendsVisible)
  }
    
  // const handleDateSelect = (selectInfo) => {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     })
  //   }
  // }

  //  const handleEventClick = () => {
  //   navigate(`/timeoffrequest}`);
  //   console.log("HandleEventClick Component")
  // }

  function handleEvents(){
    let events = props.ptoRequests.map(function (el){
      return {title: el.employee.employee_first_name,
      start: el.date_requested,
      end: el.date_requested}
    })
    setCurrentEvents(events)
  }
  
  return (
    <div className='demo-app'>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            Show Weekends
          </label>
        </div>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  )

}
export default FullCal

