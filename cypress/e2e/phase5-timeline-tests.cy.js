describe('Phase 5: Tagesleiste Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
    // Öffne das Shop-Modal und füge die Tagesleiste hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Tagesleiste').click()
  })

  it('verifies timeline initialization and basic layout', () => {
    cy.get('.timeline-tile')
      .should('be.visible')
      .should('have.css', 'flex-direction', 'column')

    cy.get('.timeline-tile .timeline-bar')
      .should('be.visible')
      .should('have.css', 'width', '100%')
  })

  it('verifies progress bar updates correctly', () => {
    // Simuliere den Fortschritt des Tages
    cy.get('.timeline-tile .progress-bar')
      .then(($progress) => {
        const initialWidth = $progress.css('width')
        
        // Simuliere eine Stunde Fortschritt
        cy.clock(Date.now() + 3600000, ['Date'])
        
        cy.get('.timeline-tile .progress-bar')
          .should('have.css', 'width')
          .and('not.equal', initialWidth)
      })
  })

  it('verifies alarm functionality', () => {
    // Simuliere eine Alarmzeit
    cy.get('.timeline-tile .alarm-time').type('13:00')
    cy.get('.timeline-tile .set-alarm-btn').click()

    // Simuliere die Alarmzeit
    cy.clock(Date.now() + 12 * 3600000, ['Date'])

    // Überprüfe, ob der Alarm aktiviert ist
    cy.get('body').should('have.class', 'alarm-active')
  })
})
