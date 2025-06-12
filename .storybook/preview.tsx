import React from "react";
import type { Preview, Decorator } from '@storybook/react-vite'
import { DarkModeWrapper } from './DarkModeWrapper'

import '../src/index.css'

const withDarkMode: Decorator = (Story, context) => {
  return (
    <DarkModeWrapper mode={context.globals.darkMode}>
      <div className="bg-background">
        <Story {...context} />
      </div>
    </DarkModeWrapper>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    darkMode: {
      name: 'Dark Mode',
      description: 'Global dark mode setting',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [withDarkMode],
};

export default preview;