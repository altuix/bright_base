import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore, Page } from '../../state/navigationStore';
import './menuItem.scss';

interface MenuItemProps {
  id: Page; // Change from string to Page type
  label: string;
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, label, isActive }) => {
  const { navigateTo } = useNavigationStore();
  
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      navigateTo(id);
    }
  });

  return (
    <div 
      ref={ref}
      className={`menu-item ${focused ? 'focused' : ''} ${isActive ? 'active' : ''}`}
      data-testid="menu-item"
    >
      {label}
    </div>
  );
};

export default MenuItem;
