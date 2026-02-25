
import React from 'react';

export type PageID = 'home' | 'executive' | 'sales' | 'profit' | 'market' | 'ops' | 'planning' | 'milk' | 'logistics' | 'purchasing' | 'hr' | 'settings';

export interface NavItem {
  id: PageID;
  label: string;
  icon: React.ReactElement;
}