export interface NotificationActionModel {
    title: string;
    class?: string;
    event: () => any;
}