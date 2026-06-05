package Backend.controller;

import Backend.memory.QdrantService;
import Backend.model.MemoryQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/memory")
public class MemoryController {

    @Autowired
    private QdrantService qdrantService;

    @PostMapping("/ask")
    public String askMemory(@RequestBody MemoryQuestion question) {
        return qdrantService.askMemory(question.getQuestion());
    }
}