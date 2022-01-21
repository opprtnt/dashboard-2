export interface ITableView {
  data: [
    {
      user: { uid: string, photo: string, displayName: string },
      title: string,
      completed: boolean,
      id: string,
      date: {
        seconds: number,
      },
      priority: number,
    }
  ];
}

export interface IDataForm {
  title: string;
  description: string;
  priority: number;
}

export interface DeleteButtonProps {
  rowUserUid: string;
  id: string;
  completed: boolean;
}

export interface TicketCardProps {
  ticketData: {
    user: { uid: string, photo: string, displayName: string },
    title: string,
    completed: boolean,
    id: string,
    date: {
      seconds: number,
    },
    priority: number,
  };
}

export interface ICard {
  completed: boolean;
  themeI: boolean;
}
