        // Fonction pour charger le fichier JSON
        function loadJSON() {
            fetch('blades.json') // Assurez-vous que le fichier JSON est dans le même répertoire que votre HTML
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const itemList = document.getElementById('itemList');
                    const attaqueText = document.getElementById('attaque');
                    const defenseText = document.getElementById('defense');
                    const enduranceText = document.getElementById('endurance');

                    // Remplir la liste déroulante avec les noms des éléments
                    data.blades.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.name; // Vous pouvez stocker le nom ou un identifiant
                        option.textContent = item.name;
                        option.dataset.attaque = item.attaque; // Stocker les valeurs dans des attributs de données
                        option.dataset.defense = item.defense;
                        option.dataset.endurance = item.endurance;
                        itemList.appendChild(option);
                    });

                    // Afficher les détails de l'élément sélectionné
                    itemList.addEventListener('change', (event) => {
                        const selectedOption = event.target.selectedOptions[0];
                        if (selectedOption) {
                            const attaque = selectedOption.dataset.attaque;
                            const defense = selectedOption.dataset.defense;
                            const endurance = selectedOption.dataset.endurance;

                            // Mettre à jour le texte des détails
                            attaqueText.textContent = `Attaque: ${attaque}`;
                            defenseText.textContent = `Défense: ${defense}`;
                            enduranceText.textContent = `Endurance: ${endurance}`;
                        }
                    });
                })
                .catch(error => console.error('Error loading JSON:', error));
        }

        // Charger le JSON lorsque la page est chargée
        window.onload = loadJSON;
