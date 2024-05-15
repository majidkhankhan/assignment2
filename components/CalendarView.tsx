import { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAppSelector } from '@/lib/store';


const extractColorCode = (title: string): { titleWithoutColor: string; colorCode: string | null } => {
  const regex = /{{#([0-9a-fA-F]{6})}}/;
  const match = regex.exec(title);
  const titleWithoutColor = title.replace(regex, "").trim();
  return { titleWithoutColor, colorCode: match ? `#${match[1]}` : null };
};


const renderEventContent = (eventInfo: any) => {
  console.log({check: eventInfo.event.mycolor})
  const {titleWithoutColor,colorCode} = extractColorCode(eventInfo.event.title);// events.map((event) => extractColorCode(event.title) || "transparent");

  return (
        <div className='event-div w-full h-full'>
            <span className="bg-cls" style={{ backgroundColor: colorCode as string }}></span>
            <div className={'content'} >
              <b>{eventInfo.timeText}</b>
              <i>{titleWithoutColor}</i>
              </div>
        </div>
  );
};

export const CalendarView: FC = () => {

  
  const taskData = useAppSelector((state)=>state.tasks.tasks)

  const events = taskData.map((task, index) => ({
    title: task.title+` {{${task.color}}}`,
    start: new Date(task.datetime as any),
    mycolor: task.color,
    // id: index + 1,
    // description: task.description,
  }));

  const getEventBackgroundColor  = (event: Event)=>{
    return '#ff9900'; // Orange for medium values
  }

  
  
  return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
  );
};

export default CalendarView;

