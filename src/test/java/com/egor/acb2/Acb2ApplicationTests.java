package com.egor.acb2;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-it.properties")
class Acb2ApplicationTests {

    @Test
    void contextLoads() {
    }

}
