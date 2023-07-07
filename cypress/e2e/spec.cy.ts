const colorScheme = (scheme: 'light' | 'dark') =>
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: {
        media: 'page',
        features: [
          {
            name: 'prefers-color-scheme',
            value: scheme,
          },
        ],
      },
    }),
  )

const themeEqual = (value: unknown) => {
  const scheme = localStorage.getItem('theme')
  expect(scheme).eq(value)
}

const clickTwice = (schema: 'light' | 'dark') => {
  colorScheme(schema)

  if (schema === 'light') {
    cy.get('button').click()
    cy.get(':root')
      .should('have.class', 'dark')
      .then(() => {
        themeEqual('dark')
      })

    cy.get('button').click()
    cy.get(':root')
      .should('not.have.class', 'dark')
      .then(() => {
        themeEqual('auto')
      })
  }

  if (schema === 'dark') {
    cy.get('button').click()
    cy.get(':root')
      .should('not.have.class', 'dark')
      .then(() => {
        themeEqual('light')
      })

    cy.get('button').click()
    cy.get(':root')
      .should('have.class', 'dark')
      .then(() => {
        themeEqual('auto')
      })
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('dark toggle test', () => {
  it('should toggle in light color scheme', () => {
    cy.visit('/')
    themeEqual(null)
    clickTwice('light')
  })

  it('should toggle in dark color scheme', () => {
    cy.visit('/')
    themeEqual(null)
    clickTwice('dark')
  })

  it('should toggle theme if color scheme change', () => {
    cy.visit('/')

    colorScheme('light')
      .then(() => {
        cy.get(':root').should('not.have.class', 'dark')
      })
      .then(() => {
        colorScheme('dark')
        cy.get(':root').should('have.class', 'dark')
      })
  })
})
