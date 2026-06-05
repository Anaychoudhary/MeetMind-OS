package Backend.controller;

import Backend.memory.QdrantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MeetingController {

    @Autowired
    private QdrantService qdrantService;

    @GetMapping("/")
    public String home() {
        return "MeetMind OS Backend Running";
    }

    @GetMapping("/api/qdrant/test")
    public String testQdrant() {
        return qdrantService.checkConnection();
    }

    @GetMapping("/api/qdrant/create")
    public String createCollection() {
        return qdrantService.createCollection();
    }
    @GetMapping("/api/qdrant/memories")
public String getMemories() {
    return qdrantService.getStoredMemories();
}
}