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
}

export interface ITheme {
  colors: {
    primary: string,
    white: string,
    black: string,
    superBlack: string,
    lightGray1: string,
    lightGray2: string,
    lightGray3: string,
    green: string,
    mediumGray: string,
    completed: string,
    bg: string,
    font: string,
    headColor: string,
    contentBg: string,
    border: string,
    primaryBtn: string,
    shadow: string,
    cardBg: string,
    high: string,
    low: string,
    normal: string,
  };
  media: {
    extraLarge: string,
    large: string,
    medium: string,
  };
  sizes: {
    container: string,
    navWidth: string,
    navWidthSmall: string,
  };
}
