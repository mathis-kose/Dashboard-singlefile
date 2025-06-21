describe('Phase 4: Kachel-Verwaltung Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('verifies adding a new tile through the shop modal', () => {
    // Öffne das Shop-Modal
    cy.get('button[data-action="open-shop"]').click()
    
    // Überprüfe, ob das Modal erscheint
    cy.get('#shop-modal').should('be.visible')
    
    // Klicke auf die Uhr-Kachel im Shop
    cy.get('#shop-modal').contains('Uhr').click()
    
    // Überprüfe, ob die Uhr-Kachel im Grid erscheint
    cy.get('#dashboard-grid .clock-tile').should('be.visible')
    
    // Überprüfe, ob das Modal sich schließt
    cy.get('#shop-modal').should('not.be.visible')
  })

  it('verifies removing a tile via context menu', () => {
    // Füge eine Test-Kachel hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Uhr').click()
    
    // Rechtsklick auf die Kachel
    cy.get('.clock-tile').rightclick()
    
    // Überprüfe, ob das Kontextmenü erscheint
    cy.get('.context-menu').should('be.visible')
    
    // Klicke auf "Entfernen"
    cy.get('.context-menu').contains('Entfernen').click()
    
    // Überprüfe, ob die Kachel entfernt wurde
    cy.get('.clock-tile').should('not.exist')
  })

  it('verifies multiple tile operations', () => {
    // Füge mehrere Kacheln hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Uhr').click()
    cy.get('#shop-modal').contains('Uhr').click()
    
    // Überprüfe, ob beide Kacheln sichtbar sind
    cy.get('.clock-tile').should('have.length', 2)
    
    // Entferne eine Kachel
    cy.get('.clock-tile').first().rightclick()
    cy.get('.context-menu').contains('Entfernen').click()
    
    // Überprüfe, ob nur eine Kachel übrig ist
    cy.get('.clock-tile').should('have.length', 1)
  })
})
