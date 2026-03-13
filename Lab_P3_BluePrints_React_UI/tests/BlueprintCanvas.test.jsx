import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blueprintsReducer from '../src/features/blueprints/blueprintsSlice'
import BlueprintCanvas from '../src/components/BlueprintCanvas.jsx'

const makeStore = () => configureStore({
  reducer: { blueprints: blueprintsReducer }
})

describe('BlueprintCanvas', () => {
  it('renderiza un canvas y llama getContext', () => {
    const store = makeStore()
    const spy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
    const { container } = render(
      <Provider store={store}>
        <BlueprintCanvas
          points={[
            { x: 10, y: 10 },
            { x: 50, y: 60 },
          ]}
        />
      </Provider>,
    )
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
