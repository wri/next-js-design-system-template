'use client'

import LayerSidebar from '@/components/demo/LayerSidebarDemo'

export default function Home() {
  return (
    <div className='App'>
      <div className='app-container'>
        <h1 style={{ marginBottom: '20px' }}>Welcome to WRI OS (TEST - NEXT)</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 25,
          }}
        >
          Content
        </div>
        <LayerSidebar />
      </div>
    </div>
  );
}
