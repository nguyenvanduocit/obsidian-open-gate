import { describe, it, expect } from 'vitest'
import { normalizeGateOption } from '../src/fns/normalizeGateOption'
import { getSvgIcon } from '../src/fns/getSvgIcon'

// Helper to clone object
const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

describe('normalizeGateOption', () => {
  it('generates id when none is supplied', () => {
    const gate = { url: 'https://example.com' }
    const normalized = normalizeGateOption(clone(gate))
    expect(normalized.id).toBe(btoa('https://example.com'))
  })

  it('applies default profile key and zoom factor', () => {
    const gate = { url: 'https://example.com' }
    const normalized = normalizeGateOption(clone(gate))
    expect(normalized.profileKey).toBe('open-gate')
    expect(normalized.zoomFactor).toBe(1)
  })

  it('defaults icon and title correctly', () => {
    const url = 'https://example.com'
    const normalized = normalizeGateOption({ url })
    expect(normalized.icon).toBe(getSvgIcon(url))
    expect(normalized.title).toBe(url)
  })

  it('throws error when url is missing', () => {
    // @ts-expect-error testing missing url
    expect(() => normalizeGateOption({})).toThrow('URL is required')
  })
})
