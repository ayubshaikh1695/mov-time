import { useState } from "react";
import Typography from "components/typography/typography";
import MenuItem from "components/menu-item/menu-item";
import { DEFAULT_MENU_ITEM_ID, MENU_DATA } from "./constants";
import styles from "./left-sidebar.module.css";

const LeftSidebar = () => {
  const [activeMenuItemId, setActiveMenuItemId] =
    useState(DEFAULT_MENU_ITEM_ID);

  const handleClick = (id) => {
    setActiveMenuItemId(id);
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2" className={styles.logoText}>
        <span className={styles.logoTextBlue}>Mov</span>
        <span className={styles.logoTextLight}>.time</span>
      </Typography>
      <div className={styles.menuContainer}>
        {MENU_DATA.map((menuSection, index) => (
          <div
            key={`${menuSection.heading}-${index}`}
            className={styles.menuSectionContainer}
          >
            <Typography
              variant="menu-heading"
              className={styles.menuSectionHeading}
            >
              {menuSection.heading}
            </Typography>
            <ul>
              {menuSection.items.map((menuItem) => (
                <li key={menuItem.id} className={styles.menuItemContainer}>
                  <MenuItem
                    active={menuItem.id === activeMenuItemId}
                    id={menuItem.id}
                    iconClass={menuItem.iconClass}
                    name={menuItem.name}
                    onClick={handleClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
