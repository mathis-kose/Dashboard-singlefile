describe('Phase 6: Datenpersistenz Tests', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('verifies localStorage persistence for dashboard layout', () => {
    // Füge eine Uhr-Kachel hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Uhr').click()

    // Speichere den aktuellen Dashboard-Status
    cy.window().then((win) => {
      const savedState = localStorage.getItem('dashboardState')
      expect(savedState).to.exist
    })

    // Lade die Seite neu und verifiziere, dass die Uhr-Kachel erhalten bleibt
    cy.reload()
    cy.get('.clock-tile').should('be.visible')
  })

  it('verifies localStorage persistence for custom theme colors', () => {
    // Öffne das Theme Switcher Modal
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Design-Umschalter').click()
    cy.get('.theme-switcher-tile .customize-btn').click()

    // Ändere die Farben
    cy.get('#theme-customization-modal input[name="accent-color-start"]').type('rgb(255, 0, 0)')
    cy.get('#theme-customization-modal input[name="accent-color-end"]').type('rgb(0, 0, 255)')
    cy.get('#theme-customization-modal .save-btn').click()

    // Verifiziere, dass die Farben gespeichert wurden
    cy.window().then((win) => {
      const savedColors = JSON.parse(localStorage.getItem('customColors'))
      expect(savedColors.accentColorStart).to.equal('rgb(255, 0, 0)')
      expect(savedColors.accentColorEnd).to.equal('rgb(0, 0, 255)')
    })

    // Lade die Seite neu und verifiziere, dass die Farben erhalten bleiben
    cy.reload()
    cy.window().then((win) => {
      const currentColors = {
        start: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-start'),
        end: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-end')
      }
      expect(currentColors.start).to.equal('rgb(255, 0, 0)')
      expect(currentColors.end).to.equal('rgb(0, 0, 255)')
    })
  })

  it('verifies localStorage persistence for prompts', () => {
    // Öffne das Shop-Modal und füge die Prompt-Bibliothek hinzu
    cy.get('button[data-action="open-shop"]').click()
    cy.get('#shop-modal').contains('Prompt-Bibliothek').click()

    // Füge einen Prompt hinzu
    cy.get('.prompt-library-tile .add-prompt-btn').click()
    cy.get('#prompt-editor-modal input[name="prompt"]').type('Was habe ich heute gelernt?')
    cy.get('#prompt-editor-modal select[name="category"]').select('Persönlich')
    cy.get('#prompt-editor-modal .save-btn').click()

    // Verifiziere, dass der Prompt gespeichert wurde
    cy.window().then((win) => {
      const savedPrompts = JSON.parse(localStorage.getItem('prompts'))
      expect(savedPrompts.Persönlich).to.have.length(1)
      expect(savedPrompts.Persönlich[0].text).to.equal('Was habe ich heute gelernt?')
    })

    // Lade die Seite neu und verifiziere, dass der Prompt erhalten bleibt
    cy.reload()
    cy.get('.prompt-library-tile .category-list')
      .contains('Persönlich')
      .siblings('.prompt-list')
      .contains('Was habe ich heute gelernt?')
  })
})
