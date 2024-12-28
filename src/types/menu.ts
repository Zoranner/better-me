export type ChatItem = { title: string; time: string }
export type OtherItem = { title: string; description: string }

export type SubMenuData = {
  chat: ChatItem[];
  agents: OtherItem[];
  tools: OtherItem[];
  knowledge: OtherItem[];
}

export type MenuId = keyof SubMenuData

export interface MenuItem {
  icon: string;
  id: MenuId;
} 