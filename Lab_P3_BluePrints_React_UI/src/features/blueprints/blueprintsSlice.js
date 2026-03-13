import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blueprintsService from '../../services/blueprintService.js'

export const fetchAuthors = createAsyncThunk('blueprints/fetchAuthors', async () => {
  const { data } = await blueprintsService.getAll()
  // Expecting API returns array of {author, name, points}
  const authors = [...new Set(data.map((bp) => bp.author))]
  return authors
})

export const fetchByAuthor = createAsyncThunk('blueprints/fetchByAuthor', async (author) => {
  const { data } = await blueprintsService.getByAuthor(author)
  return { author, items: data }
})

export const fetchBlueprint = createAsyncThunk(
  'blueprints/fetchBlueprint',
  async ({ author, name }) => {
    const { data } = await blueprintsService.getByAuthorAndName(author, name)
    return data
  },
)

export const createBlueprint = createAsyncThunk(
  'blueprints/createBlueprint',
  async (payload) => {
    const { data } = await blueprintsService.create(payload)
    return data
  },
)

export const updateBlueprint = createAsyncThunk(
  'blueprints/updateBlueprint',
  async (blueprint) => {
    // The backend returns 201 Created with no body, 
    // so we return the blueprint we sent to update the state.
    await blueprintsService.create(blueprint)
    return blueprint
  },
)

const slice = createSlice({
  name: 'blueprints',
  initialState: {
    authors: [],
    byAuthor: {},
    current: null,
    status: 'idle',
    saveStatus: 'idle',
    error: null,
  },
  reducers: {
    addPoint: (s, a) => {
      if (s.current) {
        s.current.points.push(a.payload)
      }
    },
    clearCurrent: (s) => {
      s.current = null
      s.saveStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (s) => {
        s.status = 'loading'
      })
      .addCase(fetchAuthors.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.authors = a.payload
      })
      .addCase(fetchAuthors.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.error.message
      })
      .addCase(fetchByAuthor.fulfilled, (s, a) => {
        s.byAuthor[a.payload.author] = a.payload.items
      })
      .addCase(fetchBlueprint.fulfilled, (s, a) => {
        s.current = JSON.parse(JSON.stringify(a.payload)) // Deep copy to allow mutation
        s.saveStatus = 'idle'
      })
      .addCase(createBlueprint.fulfilled, (s, a) => {
        const bp = a.payload
        if (s.byAuthor[bp.author]) s.byAuthor[bp.author].push(bp)
      })
      .addCase(updateBlueprint.pending, (s) => {
        s.saveStatus = 'loading'
      })
      .addCase(updateBlueprint.fulfilled, (s, a) => {
        s.saveStatus = 'succeeded'
        // Update the item in byAuthor list if it exists
        const bp = a.payload
        if (s.byAuthor[bp.author]) {
          const idx = s.byAuthor[bp.author].findIndex(item => item.name === bp.name)
          if (idx !== -1) s.byAuthor[bp.author][idx] = bp
        }
      })
      .addCase(updateBlueprint.rejected, (s, a) => {
        s.saveStatus = 'failed'
        s.error = a.error.message
      })
  },
})

export const { addPoint, clearCurrent } = slice.actions

export default slice.reducer
