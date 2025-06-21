describe('Phase 2: Layout & Neumorphismus Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('verifies Neumorphismus styling in Light Theme', () => {
    // Test-Kachel sollte die korrekten Schatten für Light Theme haben
    cy.get('.tile')
      .should('have.css', 'box-shadow')
      .and('match', /7px 7px 15px var\(--shadow-dark\), -7px -7px 15px var\(--shadow-light\)/)
  })

  it('verifies active state (pressed effect) on tile click', () => {
    // Simuliere ein Klick auf die Kachel
    cy.get('.tile')
      .trigger('mousedown')
      .should('have.css', 'box-shadow')
      .and('match', /inset 7px 7px 15px var\(--shadow-dark\), inset -7px -7px 15px var\(--shadow-light\)/)
      .and('have.css', 'font-size', '1.18rem')

    // Simuliere das Loslassen
    cy.get('.tile')
      .trigger('mouseup')
      .should('have.css', 'font-size', '1.2rem')
  })

  it('verifies responsive grid layout', () => {
    // Teste das Grid bei verschiedenen Bildschirmgrößen
    cy.viewport(1920, 1080) // Desktop
    cy.get('#dashboard-grid')
      .should('have.css', 'grid-template-columns')
      .and('match', /repeat\(auto-fill, minmax\(120px, 1fr\)\)/)

    cy.viewport(768, 1024) // Tablet
    cy.get('#dashboard-grid')
      .should('have.css', 'grid-template-columns')
      .and('match', /repeat\(auto-fill, minmax\(120px, 1fr\)\)/)

    cy.viewport(375, 667) // Mobile
    cy.get('#dashboard-grid')
      .should('have.css', 'grid-template-columns')
      .and('match', /repeat\(auto-fill, minmax\(120px, 1fr\)\)/)
  })
})
