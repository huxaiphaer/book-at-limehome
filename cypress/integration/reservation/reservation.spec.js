import React from "react";

describe('Make reservation flow', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.wait(2000);
    });

    it('renders title of the page', () => {
        cy.get('h2').contains('Booking your suite at limehouse');
    });

    it('should make a reservation', ()=> {
        const testEmail = `limehouse_${(new Date()).getTime()}@yopmail.com`
        cy.get('[name="numberOfGuests"]').first().type('3').blur()
        cy.get('[name="personalDetails.firstName"]').first().type('john').blur()
        cy.get('[name="personalDetails.lastName"]').first().type('wick').blur()
        cy.get('[name="location.billingAddress"]').first().type('katherinenstrasse').blur()
        cy.get('[id="mui-component-select-location.billingCountry"]').first().click()
        cy.get('[data-value="AF"]').first().click()
        cy.get('[name="location.postalCode"]').first().type('47820').blur()
        cy.get('[name="location.city"]').first().type('Dusseldorf').blur()
        cy.get('[name="personalDetails.phoneNumber"]').first().type('0704594180').blur()
        cy.get('[name="personalDetails.email"]').first().type(testEmail).blur()
        cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge"]').click()
        cy.waitFor(2000)
    })
})
