BIOME_CONFIG = {
    "Forest": {
        "movement_cost": 1,
        "resource": "Berries",
        "allowed_species": ["Rabbit", "Wolf"],
        "energy_modifier": 1.0,
        "resource_regeneration": 10,
    },

    "Grassland": {
        "movement_cost": 1,
        "resource": "Grass",
        "allowed_species": ["Rabbit", "Goat", "Camel"],
        "energy_modifier": 1.0,
        "resource_regeneration": 10,
    },

    "River": {
        "movement_cost": 2,
        "resource": "Water",
        "allowed_species": ["Fish"],
        "energy_modifier": 1.0,
        "resource_regeneration": 8,
    },

    "Mountain": {
        "movement_cost": 3,
        "resource": "Stone",
        "allowed_species": ["Goat"],
        "energy_modifier": 1.2,
        "resource_regeneration": 15,
    },

    "Desert": {
        "movement_cost": 2,
        "resource": "Cactus",
        "allowed_species": ["Camel"],
        "energy_modifier": 1.5,
        "resource_regeneration": 20,
    },
}