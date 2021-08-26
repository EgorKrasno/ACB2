package com.egor.acb2.filter;

import com.egor.acb2.constants.SecurityConstant;
import com.egor.acb2.response.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JwtAuthDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e) throws IOException {
        System.out.println();
        HttpResponse httpResponse = new HttpResponse(
                HttpStatus.FORBIDDEN.value(),
                HttpStatus.FORBIDDEN,
                "Bad Permission",
                SecurityConstant.FORBIDDEN_MESSAGE);

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), httpResponse); //serialize httpResponse into response
    }
}
