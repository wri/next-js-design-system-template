import { useState } from 'react'
import { NavigationRail } from '@worldresources/wri-design-systems'

const defaultTabValue = 'label-1'

const LayerSidebarDemo = () => {
  const [selectedTabValue, setSelectedTabValue] = useState(defaultTabValue)

  const handleOnTabClick = (selectedValue: string) => {
    setSelectedTabValue(selectedValue)
  }

  const handleOnOpenChange = (open: boolean) => {
    const $container = document.querySelector('.app-container')
    if ($container) {
      $container?.setAttribute(
        'class',
        !open ? 'app-container sidebar-closed' : 'app-container',
      )
    }
  }

  return (
    <NavigationRail
      defaultValue={defaultTabValue}
      onTabClick={handleOnTabClick}
      onOpenChange={handleOnOpenChange}
      tabs={[
        {
          label: 'Label 1',
          value: 'label-1',
        },
        {
          label: 'Label 2',
          value: 'label-2',
        },
        {
          label: 'Label 3',
          value: 'label-3',
        },
      ]}
    >
      {selectedTabValue === 'label-1' ? <div>content 1  </div> : null}
      {selectedTabValue === 'label-2' ? <div>content 2</div> : null}
      {selectedTabValue === 'label-3' ? <div>content 3</div> : null}
    </NavigationRail>
  )
}

export default LayerSidebarDemo
