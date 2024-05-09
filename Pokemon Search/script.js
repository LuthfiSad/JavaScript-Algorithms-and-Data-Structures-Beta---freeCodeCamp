document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const form = document.querySelector("form");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonId = document.getElementById("pokemon-id");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const types = document.getElementById("types");
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const specialAttack = document.getElementById("special-attack");
    const specialDefense = document.getElementById("special-defense");
    const speed = document.getElementById("speed");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon not found");
                }
                return response.json();
            })
            .then(data => {
                pokemonName.textContent = data.name.toUpperCase();
                pokemonId.textContent = `#${data.id}`;
                weight.textContent = `Weight: ${data.weight}`;
                height.textContent = `Height: ${data.height}`;
                hp.textContent = data.stats[0].base_stat;
                attack.textContent = data.stats[1].base_stat;
                defense.textContent = data.stats[2].base_stat;
                specialAttack.textContent = data.stats[3].base_stat;
                specialDefense.textContent = data.stats[4].base_stat;
                speed.textContent = data.stats[5].base_stat;

                // Clear previous types
                types.innerHTML = "";

                // Add types
                data.types && data.types.forEach(type => {
                    const typeElement = document.createElement("span");
                    typeElement.classList.add("type");
                    typeElement.classList.add(type.type.name);
                    typeElement.textContent = type.type.name.toUpperCase();
                    types.appendChild(typeElement);
                });

                // Add sprite
                const spriteContainer = document.getElementById("sprite-container");
                const sprite = document.getElementById("sprite");
                if (sprite) {
                    sprite.remove();
                }
                const spriteElement = document.createElement("img");
                spriteElement.id = "sprite";
                spriteElement.src = data.sprites.front_default;
                spriteContainer.appendChild(spriteElement);
            })
            .catch(error => {
                alert(error.message);
            });
    });
});
