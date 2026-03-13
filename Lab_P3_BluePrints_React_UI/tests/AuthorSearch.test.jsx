import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blueprintsReducer from '../src/features/blueprints/blueprintsSlice'
import AuthorSearch from '../src/components/AuthorSearch'

// Mock the service to avoid network calls during tests
vi.mock('../src/services/blueprintService.js', () => ({
    default: {
        getByAuthor: vi.fn().mockResolvedValue({ data: [] })
    }
}))

const makeStore = () => configureStore({
    reducer: { blueprints: blueprintsReducer }
})

describe('AuthorSearch', () => {
    it('dispatches fetchByAuthor when form is submitted', () => {
        const store = makeStore()
        const spy = vi.spyOn(store, 'dispatch')

        render(
            <Provider store={store}>
                <AuthorSearch />
            </Provider>
        )

        const input = screen.getByPlaceholderText(/Author name/i)
        fireEvent.change(input, { target: { value: 'Arsw' } })

        const searchButton = screen.getByRole('button', { name: /search/i })
        fireEvent.click(searchButton)

        expect(spy).toHaveBeenCalled()
    })
})
