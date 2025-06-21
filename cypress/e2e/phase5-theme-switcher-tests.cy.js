describe('Phase 5: Theme Switcher Tile Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
    // Öffne das Shop-Modal und füge die Theme-Switcher-Kachel hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Design-Umschalter').click()
  })

  it('verifies theme switcher tile initialization and layout', () => {
    cy.get('.theme-switcher-tile')
      .should('be.visible')
      .should('have.css', 'flex-direction', 'column')

    cy.get('.theme-switcher-tile .theme-options')
      .should('be.visible')
      .children()
      .should('have.length', 2) // Light und Dark Theme
  })

  it('verifies theme switching functionality', () => {
    // Verifiziere den Startzustand (Light Theme)
    cy.get('body')
      .should('not.have.attr', 'data-theme')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')

    // Schalte auf Dark Theme
    cy.get('.theme-switcher-tile button[data-theme="dark"]').click()
    cy.get('body')
      .should('have.attr', 'data-theme', 'dark')
      .should('have.css', 'background-color', 'rgb(33, 33, 33)')

    // Schalte zurück auf Light Theme
    cy.get('.theme-switcher-tile button[data-theme="light"]').click()
    cy.get('body')
      .should('not.have.attr', 'data-theme')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })

  it('verifies color customization', () => {
    // Öffne das Customization-Modal
    cy.get('.theme-switcher-tile .customize-btn').click()
    cy.get('#theme-customization-modal').should('be.visible')

    // Ändere die Farben
    cy.get('#theme-customization-modal input[name="accent-color-start"]').type('rgb(255, 0, 0)')
    cy.get('#theme-customization-modal input[name="accent-color-end"]').type('rgb(0, 0, 255)')
    cy.get('#theme-customization-modal .save-btn').click()

    // Verifiziere, dass die Farben gespeichert wurden
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 0, 0)')
  })
})
