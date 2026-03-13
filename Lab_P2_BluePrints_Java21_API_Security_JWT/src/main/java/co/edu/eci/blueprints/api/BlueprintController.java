package co.edu.eci.blueprints.api;

import co.edu.eci.blueprints.model.Blueprint;
import co.edu.eci.blueprints.services.BlueprintsServices;
import co.edu.eci.blueprints.persistence.BlueprintNotFoundException;
import co.edu.eci.blueprints.persistence.BlueprintPersistenceException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/blueprints")
@Tag(name = "Blueprints", description = "API para la gestión de planos arquitectónicos")
public class BlueprintController {

    private final BlueprintsServices services;

    public BlueprintController(BlueprintsServices services) {
        this.services = services;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_blueprints.read')")
    @Operation(summary = "Obtener todos los planos", description = "Retorna una lista de todos los planos disponibles.")
    public Set<Blueprint> getAllBlueprints() {
        return services.getAllBlueprints();
    }

    @GetMapping("/{author}")
    @PreAuthorize("hasAuthority('SCOPE_blueprints.read')")
    @Operation(summary = "Obtener planos por autor", description = "Retorna todos los planos creados por un autor específico.")
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable String author) {
        try {
            return ResponseEntity.ok(services.getBlueprintsByAuthor(author));
        } catch (BlueprintNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{author}/{name}")
    @PreAuthorize("hasAuthority('SCOPE_blueprints.read')")
    @Operation(summary = "Obtener un plano específico", description = "Retorna un plano dado su autor y nombre.")
    public ResponseEntity<?> getBlueprint(@PathVariable String author, @PathVariable String name) {
        try {
            return ResponseEntity.ok(services.getBlueprint(author, name));
        } catch (BlueprintNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_blueprints.write')")
    @Operation(summary = "Crear un nuevo plano", description = "Registra un nuevo plano en el sistema.")
    public ResponseEntity<?> create(@RequestBody Blueprint blueprint) {
        try {
            services.addNewBlueprint(blueprint);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (BlueprintPersistenceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
