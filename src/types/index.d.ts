export interface Profile {
  role_name: any;
  department_name: any;
  id: number;
  uuid: number;
  name: string;
  email: string;
  role: string;
  department_code: string;
  supervisor_email?: string;
}

export interface NumberNoticeAndMessage {
  unread_messages?: number;
  unread_notices?: number;
}

export interface Pagination {
  current_page: number;
  display: number;
  per_page: number;
  total_pages: number;
  total_records: number;
}

export interface Tab {
  current_tab: string;
}

export interface ConfirmedNotification {
  notification_id: number;
}
export interface SeenMessage {
  user_id: number;
  group_id: number | string;
  message_id: number;
}

export interface ExpToken {
  exp?: number;
  guard?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  nbf?: number;
  prv?: string;
  sub?: number;
}

export interface Department {
  id: number;
  department_name: string;
}