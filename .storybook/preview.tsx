import type { Preview } from '@storybook/react'
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/style/index.scss';
import React from 'react';


library.add(fas);
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      story:{
        inline: true,
        height: '100%',
        width: '100%',
        style:{
          padding: '20px'
        }
      },
    },
    viewport:{
      options: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    options: {
      storySort: {
        "method": "alphabetical",
        order: ["起步",['Intro 简介','Installnation 安装'], "通用组件", "Components"]
      },
      // storySort: (a, b) =>{
      //   console.log(a,b);
      //   return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })
      // }
    },
  },
};

export default preview;