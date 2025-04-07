// import { useState } from 'react'
import './style/index.scss'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Alert, { AlertSize } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menu-item'
import SubMenu from './components/Menu/submenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tab-item'
import Card from './components/Card/card'
import Icon from './components/Icon/icon'

function App() {

  return (
    <>
    <section id="app-main">
      <Icon icon='coffee' size='10x' theme='primary'/>
      <p>按钮</p>
            <Button>Default</Button>
            <Button size={ButtonSize.Medium} btnType={ButtonType.Primary}>Primary</Button>
            <Button size={ButtonSize.Medium} btnType={ButtonType.Danger}>Danger</Button>
            <Button size={ButtonSize.Medium} btnType={ButtonType.Warning}>Warning</Button>
            <Button size={ButtonSize.Medium} btnType={ButtonType.Link} href='https://www.baidu.com'>Link</Button>
            <Button size={ButtonSize.Medium} btnType={ButtonType.Text}>Text</Button>
            <p style={{marginTop: '20px'}}>大尺寸</p>
            <Button size={ButtonSize.Large}>Default</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>Primary</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>Danger</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Warning}>Warning</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Link} href='https://www.baidu.com' target="_blank">Link</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Text}>Text</Button>
            <p style={{marginTop: '20px'}}>小尺寸</p>
            <Button size={ButtonSize.Small}>Default</Button>
            <Button size={ButtonSize.Small} btnType={ButtonType.Primary}>Primary</Button>
            <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>Danger</Button>
            <Button size={ButtonSize.Small} btnType={ButtonType.Warning}>Warning</Button>
            <Button size={ButtonSize.Small} btnType={ButtonType.Link} href='https://www.baidu.com'>Link</Button>
            <Button size={ButtonSize.Small} btnType={ButtonType.Text}>Text</Button>
    <p style={{marginTop: '20px'}}>禁用按钮</p>
            <Button size={ButtonSize.Large} disabled>Default</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Primary} disabled>Primary</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Danger} disabled>Danger</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Warning} disabled>Warning</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Text} disabled>Text</Button>
            <Button size={ButtonSize.Large} btnType={ButtonType.Link} href='https://www.baidu.com' disabled>Link</Button>
      <p style={{marginTop: '20px'}}>Alert提示</p>
      <Alert alertSize={AlertSize.Large} alertType='default' message="this is alert!"></Alert>
      <p>danger</p>
      <Alert alertSize={AlertSize.Large} alertType='danger' title='提示标题' message="this is long description!"></Alert>
      <p>default</p>
      <Alert alertSize={AlertSize.Large} closeable={false} alertType='default' title='提示标题' message="this is long description!"></Alert>
      <p>warning</p>
      <Alert alertSize={AlertSize.Large} alertType='warning' title='提示标题' message="this is long description!"></Alert>

      <p>菜单Menu</p>
      <Menu onSelect={(index)=>console.log(index)}>
        <MenuItem>link 1</MenuItem>
        <MenuItem disabled>link 2</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>submenu item 1</MenuItem>
          <MenuItem>submenu item 2</MenuItem>
        </SubMenu>
        <MenuItem>link 3</MenuItem>
      </Menu>
      <p>纵向菜单Menu</p>
      <Menu onSelect={(index)=>console.log(index)} mode='vertical' defaultOpenSubmenus={['2']}>
        <MenuItem>link 1</MenuItem>
        <MenuItem disabled>link 2</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>submenu item 1</MenuItem>
          <MenuItem>submenu item 2</MenuItem>
        </SubMenu>
        <MenuItem>link 3</MenuItem>
      </Menu>
      <p>Tabs标签页</p>
      <p>card</p>
      <Card>
        <Tabs onSelect={(index)=> console.log('onSelect',index)} defaultIndex={0} type='card'>
          <TabItem label="first">first content</TabItem>
          <TabItem label="second">second content</TabItem>
        </Tabs>
      </Card>
      <p>line</p>
      <Card>
        <Tabs onSelect={(index)=> console.log('onSelect',index)} defaultIndex={0} type='line'>
          <TabItem label="first">first content</TabItem>
          <TabItem label="second">second content</TabItem>
        </Tabs>
      </Card>
    </section>
    </>
  )
}

export default App
