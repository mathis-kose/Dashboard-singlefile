describe('Phase 5: Prompt-Bibliothek Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
    // Öffne das Shop-Modal und füge die Prompt-Bibliothek hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Prompt-Bibliothek').click()
  })

  it('verifies prompt library initialization and basic layout', () => {
    cy.get('.prompt-library-tile')
      .should('be.visible')
      .should('have.css', 'flex-direction', 'column')

    cy.get('.prompt-library-tile .category-list')
      .should('be.visible')
      .children()
      .should('have.length', 3) // Standard-Kategorien: Allgemein, Arbeit, Persönlich
  })

  it('verifies adding and removing prompts', () => {
    // Öffne das Editor-Modal
    cy.get('.prompt-library-tile .add-prompt-btn').click()
    cy.get('#prompt-editor-modal').should('be.visible')

    // Füge einen Prompt hinzu
    cy.get('#prompt-editor-modal input[name="prompt"]')
      .type('Was waren die wichtigsten Erkenntnisse des Tages?')
    cy.get('#prompt-editor-modal select[name="category"]')
      .select('Persönlich')
    cy.get('#prompt-editor-modal .save-btn').click()

    // Überprüfe, ob der Prompt hinzugefügt wurde
    cy.get('.prompt-library-tile .category-list')
      .contains('Persönlich')
      .siblings('.prompt-list')
      .contains('Was waren die wichtigsten Erkenntnisse des Tages?')

    // Entferne den Prompt
    cy.get('.prompt-library-tile .category-list')
      .contains('Persönlich')
      .siblings('.prompt-list')
      .contains('Was waren die wichtigsten Erkenntnisse des Tages?')
      .parent()
      .find('.remove-btn')
      .click()

    // Überprüfe, ob der Prompt entfernt wurde
    cy.get('.prompt-library-tile .category-list')
      .contains('Persönlich')
      .siblings('.prompt-list')
      .should('not.contain', 'Was waren die wichtigsten Erkenntnisse des Tages?')
  })

  it('verifies placeholder replacement', () => {
    // Füge einen Prompt mit Platzhaltern hinzu
    cy.get('.prompt-library-tile .add-prompt-btn').click()
    cy.get('#prompt-editor-modal input[name="prompt"]')
      .type('Was habe ich heute bei {{projekt}} gelernt?')
    cy.get('#prompt-editor-modal select[name="category"]')
      .select('Arbeit')
    cy.get('#prompt-editor-modal .save-btn').click()

    // Ersetze den Platzhalter
    cy.get('.prompt-library-tile .category-list')
      .contains('Arbeit')
      .siblings('.prompt-list')
      .contains('Was habe ich heute bei {{projekt}} gelernt?')
      .parent()
      .find('.replace-placeholder-btn')
      .click()

    cy.get('#placeholder-replacement-modal')
      .should('be.visible')
      .find('input[name="projekt"]')
      .type('Projekt X')
      .parent()
      .find('.replace-btn')
      .click()

    // Überprüfe das Ergebnis
    cy.get('.prompt-library-tile .category-list')
      .contains('Arbeit')
      .siblings('.prompt-list')
      .contains('Was habe ich heute bei Projekt X gelernt?')
  })
})
